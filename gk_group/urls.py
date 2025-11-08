"""
URL configuration for gk_group project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from gk_group_app import views

# Custom error handlers
handler404 = 'gk_group_app.views.custom_404'
handler500 = 'gk_group_app.views.custom_500'

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # App URLs
    path('', include('gk_group_app.urls')),

    # Direct URLs for special pages
    path('robots.txt', views.robots_txt),
    path('sitemap.xml', views.sitemap_xml),

    # API endpoints
    path('api/contact-ajax/', views.contact_form_ajax, name='contact_form_ajax'),
    path('api/newsletter/', views.newsletter_subscribe, name='newsletter_subscribe'),
]

# Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += staticfiles_urlpatterns()
