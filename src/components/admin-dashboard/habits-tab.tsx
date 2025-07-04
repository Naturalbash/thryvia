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
import {
  Target,
  Activity,
  BookOpen,
  Search,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Habit } from "./data";
import { useAdminDashboard } from "./use-admin-dashboard";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

export default function HabitsTab() {
  const {
    habitSearchTerm,

    isHabitModalOpen,

    editingHabit,

    habitForm,

    filteredHabits,

    wellbeingStats,

    setHabitSearchTerm,

    setIsHabitModalOpen,

    setHabitForm,

    handleHabitSubmit,

    resetHabitForm,

    handleEditHabit,

    handleDeleteHabit,

    getCategoryInfo,
  } = useAdminDashboard();

  return (
    <TabsContent value="habits" className="space-y-6">
      {/* Wellbeing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Habits
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {wellbeingStats.totalHabits}
                </p>
              </div>
              <Target className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Daily Habits
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {wellbeingStats.dailyHabits}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resources</p>
                <p className="text-3xl font-bold text-blue-600">
                  {wellbeingStats.totalResources}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Articles</p>
                <p className="text-3xl font-bold text-purple-600">
                  {wellbeingStats.articles}
                </p>
              </div>
              <BookOpen className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Habit Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4" />
          <Input
            placeholder="Search habits..."
            value={habitSearchTerm}
            onChange={(e) => setHabitSearchTerm(e.target.value)}
            className="pl-10 py-6 border-green-500"
          />
        </div>
        <Dialog open={isHabitModalOpen} onOpenChange={setIsHabitModalOpen}>
          <DialogTrigger asChild>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
              onClick={resetHabitForm}
            >
              <Plus className="h-4 w-4" />
              New Habit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingHabit ? "Edit Habit" : "Create New Habit"}
              </DialogTitle>
              <DialogDescription>
                {editingHabit
                  ? "Update habit details below."
                  : "Add a new habit for team wellbeing."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleHabitSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="habitTitle">Habit Title</Label>
                  <Input
                    id="habitTitle"
                    value={habitForm.title}
                    onChange={(e) =>
                      setHabitForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="Enter habit title"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="habitDescription">Description</Label>
                  <Textarea
                    id="habitDescription"
                    value={habitForm.description}
                    onChange={(e) =>
                      setHabitForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Habit description"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="habitCategory">Category</Label>
                    <Select
                      value={habitForm.category}
                      onValueChange={(value: Habit["category"]) =>
                        setHabitForm((prev) => ({
                          ...prev,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical</SelectItem>
                        <SelectItem value="mental">Mental</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="productivity">
                          Productivity
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="habitFrequency">Frequency</Label>
                    <Select
                      value={habitForm.frequency}
                      onValueChange={(value: Habit["frequency"]) =>
                        setHabitForm((prev) => ({
                          ...prev,
                          frequency: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsHabitModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700"
                >
                  {editingHabit ? "Update Habit" : "Create Habit"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHabits.map((habit) => {
          const categoryInfo = getCategoryInfo(habit.category);
          const CategoryIcon = categoryInfo.icon;

          return (
            <Card
              key={habit.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-2">
                      {habit.title}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`${categoryInfo.color} text-xs`}>
                        <CategoryIcon className="w-3 h-3 mr-1" />
                        {categoryInfo.label}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {habit.frequency}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditHabit(habit)}
                      className="h-8 w-8 p-0 hover:bg-green-50"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteHabit(habit.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {habit.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredHabits.length === 0 && (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No habits found
          </h3>
          <p className="text-gray-600">
            Create habits to help your team maintain wellbeing.
          </p>
        </div>
      )}
    </TabsContent>
  );
}
