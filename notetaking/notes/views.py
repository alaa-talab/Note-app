from rest_framework import viewsets
from .models import Note
from .serializers import NoteSerializer
from rest_framework import generics
from rest_framework.filters import SearchFilter

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteListView(generics.ListAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    filter_backends = [SearchFilter]
    search_fields = ['title', 'content']