import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Calendar, User, MessageSquare, ExternalLink, Check, X } from 'lucide-react';

interface ContactForm {
  _id: string;
  name: string;
  email: string;
  message: string;
  intent: 'partnership' | 'pilot' | 'sponsorship' | 'careers';
  links?: string;
  ipAddress?: string;
  userAgent?: string;
  isRead: boolean;
  isReplied: boolean;
  replyMessage?: string;
  repliedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<ContactForm | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact/admin/all');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (contactId: string) => {
    try {
      const response = await fetch(`/api/contact/admin/${contactId}/read`, {
        method: 'PATCH'
      });
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === contactId ? { ...contact, isRead: true } : contact
        ));
      }
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const replyToContact = async (contactId: string) => {
    if (!replyMessage.trim()) return;
    
    setReplying(true);
    try {
      const response = await fetch(`/api/contact/admin/${contactId}/reply`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ replyMessage })
      });
      
      if (response.ok) {
        setContacts(contacts.map(contact => 
          contact._id === contactId ? { 
            ...contact, 
            isReplied: true, 
            replyMessage,
            repliedAt: new Date().toISOString()
          } : contact
        ));
        setReplyMessage('');
        setSelectedContact(null);
      }
    } catch (error) {
      console.error('Error replying to contact:', error);
    } finally {
      setReplying(false);
    }
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'partnership': return 'bg-blue-100 text-blue-800';
      case 'pilot': return 'bg-green-100 text-green-800';
      case 'sponsorship': return 'bg-purple-100 text-purple-800';
      case 'careers': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading contacts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Forms Admin</h1>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Contact Forms ({contacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedContact?._id === contact._id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    } ${!contact.isRead ? 'bg-blue-50 dark:bg-blue-950/20' : ''}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground">{contact.name}</h3>
                          <Badge className={getIntentColor(contact.intent)}>
                            {contact.intent}
                          </Badge>
                          {!contact.isRead && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              New
                            </Badge>
                          )}
                          {contact.isReplied && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Replied
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{contact.email}</p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {contact.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Details */}
          <div>
            {selectedContact ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-foreground">{selectedContact.name}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-foreground">{selectedContact.email}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Intent</label>
                    <Badge className={getIntentColor(selectedContact.intent)}>
                      {selectedContact.intent}
                    </Badge>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Message</label>
                    <p className="text-foreground whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                  
                  {selectedContact.links && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Links</label>
                      <a 
                        href={selectedContact.links} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1"
                      >
                        {selectedContact.links}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Submitted</label>
                    <p className="text-foreground">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {selectedContact.replyMessage && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Reply</label>
                      <p className="text-foreground whitespace-pre-wrap">{selectedContact.replyMessage}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {!selectedContact.isRead && (
                      <Button 
                        onClick={() => markAsRead(selectedContact._id)}
                        variant="outline"
                        className="w-full"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    )}
                    
                    {!selectedContact.isReplied && (
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Type your reply..."
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          rows={3}
                        />
                        <Button 
                          onClick={() => replyToContact(selectedContact._id)}
                          disabled={!replyMessage.trim() || replying}
                          className="w-full"
                        >
                          {replying ? 'Sending...' : 'Send Reply'}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Select a contact to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
