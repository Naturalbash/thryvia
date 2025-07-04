"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Search, Plus, Edit3, Trash2, Link, BookOpen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Resource } from "./data";
import { useAdminDashboard } from "./use-admin-dashboard";
import { Badge } from "../ui/badge";

export default function ResourcesTab() {
  const {
    resourceSearchTerm,
    setResourceSearchTerm,
    resourceTypeFilter,
    setResourceTypeFilter,
    isResourceModalOpen,
    setIsResourceModalOpen,
    editingResource,
    resourceForm,
    setResourceForm,
    handleResourceSubmit,
    resetResourceForm,
    handleEditResource,
    handleDeleteResource,
    filteredResources,
    getResourceTypeInfo,
  } = useAdminDashboard();

  return (
    <TabsContent value="resources" className="space-y-6">
      {/* Resource Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-col items-center sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={resourceSearchTerm}
              onChange={(e) => setResourceSearchTerm(e.target.value)}
              className="pl-10 py-6 border-purple-500"
            />
          </div>
          <Select
            value={resourceTypeFilter}
            onValueChange={setResourceTypeFilter}
          >
            <SelectTrigger className="w-full sm:w-48 bg-white">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="article">Articles</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="podcast">Podcasts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog
          open={isResourceModalOpen}
          onOpenChange={setIsResourceModalOpen}
        >
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              onClick={resetResourceForm}
            >
              <Plus className="h-4 w-4" />
              New Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {editingResource ? "Edit Resource" : "Add New Resource"}
              </DialogTitle>
              <DialogDescription>
                {editingResource
                  ? "Update resource details below."
                  : "Add a new wellbeing resource for your team."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleResourceSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="resourceTitle">Resource Title</Label>
                  <Input
                    id="resourceTitle"
                    value={resourceForm.title}
                    onChange={(e) =>
                      setResourceForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter resource title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resourceDescription">Description</Label>
                  <Textarea
                    id="resourceDescription"
                    value={resourceForm.description}
                    onChange={(e) =>
                      setResourceForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Resource description"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="resourceUrl">URL</Label>
                  <Input
                    id="resourceUrl"
                    type="url"
                    value={resourceForm.url}
                    onChange={(e) =>
                      setResourceForm((prev) => ({
                        ...prev,
                        url: e.target.value,
                      }))
                    }
                    placeholder="https://example.com"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="resourceType">Type</Label>
                    <Select
                      value={resourceForm.type}
                      onValueChange={(value: Resource["type"]) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          type: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="podcast">Podcast</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="resourceCategory">Category</Label>
                    <Select
                      value={resourceForm.category}
                      onValueChange={(value: Resource["category"]) =>
                        setResourceForm((prev) => ({
                          ...prev,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stress-management">
                          Stress Management
                        </SelectItem>
                        <SelectItem value="productivity">
                          Productivity
                        </SelectItem>
                        <SelectItem value="mindfulness">Mindfulness</SelectItem>
                        <SelectItem value="work-life-balance">
                          Work-Life Balance
                        </SelectItem>
                        <SelectItem value="communication">
                          Communication
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsResourceModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  {editingResource ? "Update Resource" : "Add Resource"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const typeInfo = getResourceTypeInfo(resource.type);
          const TypeIcon = typeInfo.icon;

          return (
            <Card
              key={resource.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {resource.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${typeInfo.color} text-xs`}>
                        <TypeIcon className="w-3 h-3 mr-1" />
                        {typeInfo.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs capitalize">
                        {resource.category.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditResource(resource)}
                      className="h-8 w-8 p-0 hover:bg-purple-50"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteResource(resource.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-gray-600">
                  {resource.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(resource.url, "_blank")}
                    className="flex items-center gap-2 hover:bg-purple-50"
                  >
                    <Link className="h-4 w-4" />
                    View Resource
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No resources found
          </h3>
          <p className="text-gray-600">
            Add resources to support your team&#39;s wellbeing.
          </p>
        </div>
      )}
    </TabsContent>
  );
}
