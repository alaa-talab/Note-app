from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, NoteListView

router = DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', NoteListView.as_view(), name='note-search'),
]
