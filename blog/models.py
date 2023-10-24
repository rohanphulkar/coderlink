from django.db import models
from froala_editor.fields import FroalaField
import uuid
from django.template.defaultfilters import slugify
from accounts.models import User
from storages.backends.ftp import FTPStorage

fs = FTPStorage()


class Category(models.Model):
    id = models.UUIDField(editable=False, default=uuid.uuid4, primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name_plural = 'Categories'


class Post(models.Model):
    id = models.UUIDField(editable=False, default=uuid.uuid4, primary_key=True)
    categories = models.ManyToManyField(
        Category, related_name="posts", blank=True)
    title = models.CharField(max_length=255)
    content = FroalaField(options={
        'height': 400,
        'width': '100%'
    })
    image = models.ImageField(upload_to='blog_images/',
                              null=True, blank=True, storage=fs)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        slug = slugify(self.title)
        self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Comment(models.Model):
    id = models.UUIDField(editable=False, default=uuid.uuid4, primary_key=True)
    author = models.ForeignKey(User,on_delete=models.CASCADE)
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment for post {self.post.title}"