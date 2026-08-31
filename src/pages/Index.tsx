import React, { useState } from 'react';
import { Heart, MessageSquare, Share2, Search, Plus, Zap, Users, FileText, Music, Sparkles, Bell, Menu, X } from 'lucide-react';

export default function Index() {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentUser = {
    name: 'Alex Chen',
    role: 'Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    notifications: 3
  };

  const featuredContent = [
    {
      id: 1,
      title: 'The Last Street',
      type: 'Feature Film',
      image: 'https://images.unsplash.com/photo-1489599849228-eb342a5694d0?w=600&h=400&fit=crop',
      creator: 'Michael Torres',
      views: '2.4K',
      likes: '580'
    },
    {
      id: 2,
      title: 'Monrovia Dreams',
      type: 'Documentary',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&h=400&fit=crop',
      creator: 'Sarah Williams',
      views: '1.8K',
      likes: '420'
    },
    {
      id: 3,
      title: 'Urban Pulse',
      type: 'Music Video',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop',
      creator: 'James Patterson',
      views: '3.1K',
      likes: '890'
    }
  ];

  const quickActions = [
    { icon: Plus, label: 'Create Project', color: 'from-red-600 to-pink-600' },
    { icon: FileText, label: 'Upload Video', color: 'from-blue-600 to-cyan-600' },
    { icon: Music, label: 'Upload Music', color: 'from-purple-600 to-pink-600' },
    { icon: Sparkles, label: 'AI Studio', color: 'from-yellow-600 to-orange-600' }
  ];

  const recentMessages = [
    { id: 1, name: 'Production Team', message: 'Scene 5 is ready for review', unread: 2, avatar: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=40&h=40&fit=crop' },
    { id: 2, name: 'Sarah - Composer', message: 'New soundtrack uploaded ✓', unread: 0, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop' },
    { id: 3, name: 'Cast & Crew', message: 'Monday shoot confirmed', unread: 1, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop' }
  ];

  const featuredCreators = [
    { name: 'Michael Torres', role: 'Producer', projects: 12, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
    { name: 'Sarah Williams', role: 'Director', projects: 8, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'James Patterson', role: 'Cinematographer', projects: 15, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' }
  ];

  const projects = [
    { id: 1, name: 'The Last Street', status: 'In Production', members: 8, image: 'https://images.unsplash.com/photo-1489599849228-eb342a5694d0?w=200&h=200&fit=crop' },
    { id: 2, name: 'Monrovia Rising', status: 'Pre-Production', members: 5, image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=200&fit=crop' },
    { id: 3, name: 'Urban Pulse', status: 'Post-Production', members: 12, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <h1 className="text-xl font-bold hidden sm:block">FilmCraft Studio</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Home', 'Projects', 'Discover', 'AI Studio'].map((item) => (
              <button key={item} className="text-sm hover:text-primary transition">
                {item}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition">
              <Search className="w-4 h-4" />
              <span className="text-sm hidden lg:inline">Search</span>
            </button>
            <button className="relative p-2 hover:bg-secondary/50 rounded-lg transition">
              <Bell className="w-5 h-5" />
              {currentUser.notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
              )}
            </button>
            <button className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border p-4 space-y-3">
            {['Home', 'Projects', 'Discover', 'AI Studio', 'Chat', 'Profile'].map((item) => (
              <button key={item} className="block w-full text-left px-3 py-2 hover:bg-secondary/50 rounded-lg transition">
                {item}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Hero Section */}
          <section className="relative h-96 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849228-eb342a5694d0?w=1920&h=1080&fit=crop')] bg-cover bg-center"></div>
            </div>
            <div className="relative h-full flex flex-col justify-center px-6 sm:px-12">
              <div className="max-w-2xl">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Welcome back, {currentUser.name}</h2>
                <p className="text-lg text-muted-foreground mb-8">Continue your creative journey. Your projects are waiting.</p>
                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-semibold hover:opacity-90 transition">
                    Start Creating
                  </button>
                  <button className="px-6 py-3 border border-border rounded-lg font-semibold hover:bg-secondary/50 transition">
                    Browse Gallery
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="px-6 sm:px-12 py-12">
            <h3 className="text-2xl font-bold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.label}
                    className={`p-6 rounded-xl bg-gradient-to-br ${action.color} hover:scale-105 transition transform`}
                  >
                    <Icon className="w-8 h-8 mb-3 text-white" />
                    <p className="text-white font-semibold text-sm">{action.label}</p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Featured Content */}
          <section className="px-6 sm:px-12 py-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Featured Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredContent.map((content) => (
                <div key={content.id} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl mb-4 h-56 bg-secondary/50">
                    <img
                      src={content.image}
                      alt={content.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                      <div className="flex gap-3 w-full">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-lg hover:opacity-90 transition">
                          <Heart className="w-4 h-4" /> Like
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-secondary py-2 px-4 rounded-lg hover:opacity-90 transition">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{content.type}</p>
                  <h4 className="font-bold text-lg mb-1">{content.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">by {content.creator}</p>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>{content.views} views</span>
                    <span>{content.likes} likes</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Your Projects */}
          <section className="px-6 sm:px-12 py-12 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Your Projects</h3>
              <button className="text-primary hover:underline text-sm">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-border rounded-xl overflow-hidden hover:border-primary/50 transition group cursor-pointer">
                  <div className="relative h-40 overflow-hidden bg-secondary/50">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold mb-2">{project.name}</h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="px-2 py-1 bg-secondary/50 rounded text-xs">{project.status}</span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4" /> {project.members}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Creators */}
          <section className="px-6 sm:px-12 py-12 border-t border-border">
            <h3 className="text-2xl font-bold mb-6">Featured Creators</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredCreators.map((creator) => (
                <div key={creator.name} className="border border-border rounded-xl p-6 text-center hover:border-primary/50 transition cursor-pointer">
                  <img
                    src={creator.image}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="font-bold mb-1">{creator.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{creator.role}</p>
                  <p className="text-xs text-muted-foreground mb-4">{creator.projects} projects</p>
                  <button className="w-full px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition text-sm">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-border px-6 sm:px-12 py-12 text-sm text-muted-foreground">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h5 className="font-semibold text-foreground mb-4">Product</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Security</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-4">Company</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-foreground transition">About</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-4">Resources</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-foreground transition">Docs</a></li>
                  <li><a href="#" className="hover:text-foreground transition">API</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Support</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-4">Legal</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                  <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 text-center">
              <p>&copy; 2026 FilmCraft Studio. All rights reserved.</p>
            </div>
          </footer>
        </main>

        {/* Chat Sidebar - Desktop */}
        <aside className="hidden lg:flex flex-col w-80 border-l border-border bg-card">
          <div className="p-4 border-b border-border">
            <h3 className="font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5" /> Messages
            </h3>
          </div>
          <div className="flex-1 overflow-auto">
            {recentMessages.map((msg) => (
              <button
                key={msg.id}
                className="w-full p-3 border-b border-border hover:bg-secondary/50 transition text-left"
              >
                <div className="flex gap-3">
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{msg.name}</p>
                      {msg.unread > 0 && (
                        <span className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs text-white">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition">
              Start New Chat
            </button>
          </div>
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card">
        <div className="flex items-center justify-around">
          {[
            { icon: FileText, label: 'Home', id: 'home' },
            { icon: Plus, label: 'Projects', id: 'projects' },
            { icon: Music, label: 'Upload', id: 'upload' },
            { icon: Sparkles, label: 'AI', id: 'ai' },
            { icon: MessageSquare, label: 'Chat', id: 'chat' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex-1 flex flex-col items-center justify-center py-3 transition ${
                  activeNav === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile bottom padding */}
      <div className="md:hidden h-20"></div>
    </div>
  );
}
