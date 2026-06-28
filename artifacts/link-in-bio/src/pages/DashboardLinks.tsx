import { useState } from "react";
import { useGetMe, useGetMyLinks, useCreateLink, useUpdateLink, useDeleteLink, useReorderLinks, getGetMyLinksQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { GripVertical, Plus, Trash2, Pencil, BarChart2, Loader2, ExternalLink, LinkIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Link as ApiLink } from "@workspace/api-client-react";

function SortableLinkItem({ 
  link, 
  onEdit, 
  onDelete, 
  onToggle 
}: { 
  link: ApiLink, 
  onEdit: (link: ApiLink) => void,
  onDelete: (id: string) => void,
  onToggle: (id: string, isVisible: boolean) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-card/50 backdrop-blur transition-colors ${isDragging ? 'shadow-lg border-primary/50 opacity-90' : 'hover:bg-card'}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab hover:text-primary active:cursor-grabbing text-muted-foreground p-1">
        <GripVertical className="h-5 w-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold truncate">{link.title}</h3>
          {!link.isVisible && <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">Hidden</span>}
        </div>
        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground truncate hover:text-primary transition-colors flex items-center gap-1">
          {link.url}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground bg-white/5 px-2 py-1 rounded">
          <BarChart2 className="h-4 w-4" />
          {link.clicks} clicks
        </div>
        
        <Switch 
          checked={link.isVisible} 
          onCheckedChange={(checked) => onToggle(link.id, checked)} 
        />
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(link)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => onDelete(link.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLinks() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { data: links, isLoading } = useGetMyLinks({ query: { queryKey: getGetMyLinksQueryKey() } });
  
  const createLink = useCreateLink();
  const updateLink = useUpdateLink();
  const deleteLink = useDeleteLink();
  const reorderLinks = useReorderLinks();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ApiLink | null>(null);
  
  const [formData, setFormData] = useState({ title: "", url: "" });
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id && links) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      
      const newLinks = arrayMove(links, oldIndex, newIndex);
      
      // Optimistic update
      queryClient.setQueryData(getGetMyLinksQueryKey(), newLinks);
      
      // Save to backend
      reorderLinks.mutate({ data: { ids: newLinks.map(l => l.id) } }, {
        onError: () => {
          // Revert on error
          queryClient.invalidateQueries({ queryKey: getGetMyLinksQueryKey() });
          toast({ variant: "destructive", title: "Error", description: "Failed to reorder links." });
        }
      });
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.url) return;
    
    createLink.mutate({ data: formData }, {
      onSuccess: () => {
        setIsAddOpen(false);
        setFormData({ title: "", url: "" });
        queryClient.invalidateQueries({ queryKey: getGetMyLinksQueryKey() });
        toast({ title: "Success", description: "Link added successfully." });
      },
      onError: (err) => {
        toast({ variant: "destructive", title: "Error", description: "Failed to add link." });
      }
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    
    updateLink.mutate({ 
      id: editingLink.id, 
      data: { title: editingLink.title, url: editingLink.url } 
    } as any, { // Type override needed depending on orval gen
      onSuccess: () => {
        setEditingLink(null);
        queryClient.invalidateQueries({ queryKey: getGetMyLinksQueryKey() });
        toast({ title: "Success", description: "Link updated." });
      }
    });
  };

  const handleToggle = (id: string, isVisible: boolean) => {
    // Optimistic update
    if (links) {
      queryClient.setQueryData(getGetMyLinksQueryKey(), links.map(l => l.id === id ? { ...l, isVisible } : l));
    }
    
    updateLink.mutate({ id, data: { isVisible } } as any, {
      onError: () => queryClient.invalidateQueries({ queryKey: getGetMyLinksQueryKey() })
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this link?")) {
      deleteLink.mutate({ id } as any, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetMyLinksQueryKey() });
          toast({ title: "Deleted", description: "Link has been removed." });
        }
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Links</h1>
          <p className="text-muted-foreground mt-1">Manage your links and their order.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground font-semibold rounded-full px-6">
              <Plus className="mr-2 h-4 w-4" /> Add Link
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleAddSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Link</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input 
                    id="title" 
                    placeholder="My Portfolio" 
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="url" className="text-sm font-medium">URL</label>
                  <Input 
                    id="url" 
                    type="url" 
                    placeholder="https://example.com" 
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createLink.isPending}>
                  {createLink.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Add Link
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      ) : links && links.length > 0 ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={links.map(l => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {links.map((link) => (
                <SortableLinkItem 
                  key={link.id} 
                  link={link} 
                  onEdit={setEditingLink}
                  onDelete={handleDelete}
                  onToggle={handleToggle}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="text-center py-20 border border-white/5 border-dashed rounded-2xl bg-card/30">
          <div className="mx-auto w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
            <LinkIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No links yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto mt-2 mb-6">
            Add your first link to start building your Biolink profile.
          </p>
          <Button onClick={() => setIsAddOpen(true)} variant="outline" className="rounded-full">
            <Plus className="mr-2 h-4 w-4" /> Add your first link
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingLink} onOpenChange={(open) => !open && setEditingLink(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Link</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-sm font-medium">Title</label>
                <Input 
                  id="edit-title" 
                  value={editingLink?.title || ""}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, title: e.target.value } : null)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="edit-url" className="text-sm font-medium">URL</label>
                <Input 
                  id="edit-url" 
                  type="url" 
                  value={editingLink?.url || ""}
                  onChange={(e) => setEditingLink(prev => prev ? { ...prev, url: e.target.value } : null)}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateLink.isPending}>
                {updateLink.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
