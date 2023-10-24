from rest_framework import serializers
from .models import *
from accounts.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField('get_comments')
    categories = CategorySerializer(many=True,read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'categories', 'title', 'content', 'image', 'created_at', 'updated_at', 'slug','comments')
    
    def get_comments(self,obj):
        comments = Comment.objects.filter(post=obj.id)
        serializer = CommentSerializer(comments,many=True)
        return serializer.data