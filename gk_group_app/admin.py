from django.contrib import admin
from .models import ContactMessage, SiteContent, TeamMember

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'interest_area', 'created_at', 'is_read', 'is_archived')
    list_filter = ('is_read', 'is_archived', 'interest_area', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_per_page = 25
    actions = ['mark_as_read', 'mark_as_unread', 'archive_messages']

    fieldsets = (
        ('Contact Information', {
            'fields': ('name', 'email', 'phone')
        }),
        ('Message Details', {
            'fields': ('subject', 'message', 'interest_area')
        }),
        ('Metadata', {
            'fields': ('ip_address', 'user_agent', 'created_at', 'updated_at')
        }),
        ('Status', {
            'fields': ('is_read', 'is_archived')
        }),
    )
    readonly_fields = ('created_at', 'updated_at', 'ip_address', 'user_agent')

    def mark_as_read(self, request, queryset):
        queryset.update(is_read=True)
    mark_as_read.short_description = "Mark selected messages as read"

    def mark_as_unread(self, request, queryset):
        queryset.update(is_read=False)
    mark_as_unread.short_description = "Mark selected messages as unread"

    def archive_messages(self, request, queryset):
        queryset.update(is_archived=True)
    archive_messages.short_description = "Archive selected messages"

@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    list_display = ('content_type', 'content_preview', 'is_active', 'updated_at')
    list_filter = ('is_active', 'content_type')
    search_fields = ('content_type', 'content')
    list_editable = ('is_active',)

    def content_preview(self, obj):
        return (obj.content[:75] + '...') if len(obj.content) > 75 else obj.content
    content_preview.short_description = 'Content Preview'

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'position', 'is_active', 'order')
    list_filter = ('is_active', 'position')
    search_fields = ('name', 'position', 'bio')
    list_editable = ('is_active', 'order')
    list_per_page = 20