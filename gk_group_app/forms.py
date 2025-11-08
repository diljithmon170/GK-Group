from django import forms
from django.core.validators import RegexValidator, MinLengthValidator, MaxLengthValidator
from django.core.exceptions import ValidationError
from django.utils.html import strip_tags
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    """
    Contact form with validation and security measures
    """

    phone_validator = RegexValidator(
        regex=r'^[\d\+\-\s\(\)]+$',
        message='Phone number should only contain digits, +, -, spaces, and parentheses.'
    )

    name_validator = RegexValidator(
        regex=r'^[a-zA-Z\s\.]+$',
        message='Name should only contain letters, spaces, and periods.'
    )

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if name:
            name = strip_tags(name.strip())
            if len(name) < 2:
                raise ValidationError("Name must be at least 2 characters long.")
            if len(name) > 100:
                raise ValidationError("Name cannot exceed 100 characters.")
        return name

    def clean_message(self):
        message = self.cleaned_data.get('message')
        if message:
            message = strip_tags(message.strip())
            if len(message) < 10:
                raise ValidationError("Message must be at least 10 characters long.")
            if len(message) > 2000:
                raise ValidationError("Message cannot exceed 2000 characters.")
        return message

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            email = email.strip().lower()
            # Basic email validation
            if '@' not in email or '.' not in email:
                raise ValidationError("Please enter a valid email address.")
        return email

    def clean_phone(self):
        phone = self.cleaned_data.get('phone')
        if phone:
            phone = strip_tags(phone.strip())
            if phone and len(phone) < 6:
                raise ValidationError("Phone number must be at least 6 digits long.")
        return phone

    def clean_subject(self):
        subject = self.cleaned_data.get('subject')
        if subject:
            subject = strip_tags(subject.strip())
            if len(subject) < 2:
                raise ValidationError("Subject must be at least 2 characters long.")
            if len(subject) > 200:
                raise ValidationError("Subject cannot exceed 200 characters.")
        return subject

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['name'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Enter your full name',
            'required': 'required',
            'minlength': '2',
            'maxlength': '100'
        })
        self.fields['email'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Enter your email address',
            'type': 'email',
            'required': 'required'
        })
        self.fields['phone'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Enter your phone number (optional)',
            'type': 'tel'
        })
        self.fields['message'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Tell us about your requirements...',
            'rows': '5',
            'required': 'required',
            'minlength': '10',
            'maxlength': '2000'
        })
        self.fields['subject'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'What is this regarding?'
        })
        self.fields['interest_area'].widget.attrs.update({
            'class': 'form-control'
        })

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'interest_area', 'message']
        widgets = {
            'name': forms.TextInput(),
            'email': forms.EmailInput(),
            'phone': forms.TextInput(),
            'subject': forms.TextInput(),
            'message': forms.Textarea(),
            'interest_area': forms.Select()
        }
        labels = {
            'name': 'Full Name',
            'email': 'Email Address',
            'phone': 'Phone Number (Optional)',
            'subject': 'Subject',
            'interest_area': 'Area of Interest',
            'message': 'Your Message'
        }
        help_texts = {
            'name': 'Letters, spaces, and periods only (2-100 characters)',
            'email': 'We will never share your email with anyone else',
            'phone': 'Include country code if outside India',
            'message': 'Minimum 10 characters, maximum 2000 characters',
            'interest_area': 'Select the area you are interested in'
        }
        error_messages = {
            'name': {
                'required': 'Please enter your full name.',
                'invalid': 'Please enter a valid name.'
            },
            'email': {
                'required': 'Please enter your email address.',
                'invalid': 'Please enter a valid email address.'
            },
            'message': {
                'required': 'Please enter your message.',
                'min_length': 'Message must be at least 10 characters long.',
                'max_length': 'Message cannot exceed 2000 characters.'
            }
        }


class QuickContactForm(forms.Form):
    """
    Simplified contact form for quick inquiries
    """
    name = forms.CharField(
        max_length=100,
        validators=[RegexValidator(r'^[a-zA-Z\s\.]+$', 'Name should only contain letters, spaces, and periods.')],
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Name',
            'required': 'required'
        })
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Email',
            'required': 'required'
        })
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Your Message',
            'rows': '3',
            'required': 'required',
            'minlength': '10'
        }),
        validators=[MinLengthValidator(10)]
    )

    def clean_name(self):
        name = self.cleaned_data.get('name')
        return strip_tags(name.strip()) if name else name

    def clean_email(self):
        email = self.cleaned_data.get('email')
        return email.strip().lower() if email else email

    def clean_message(self):
        message = self.cleaned_data.get('message')
        return strip_tags(message.strip()) if message else message


class NewsletterForm(forms.Form):
    """
    Newsletter subscription form
    """
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your email for updates',
            'required': 'required'
        })
    )

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            email = email.strip().lower()
        return email