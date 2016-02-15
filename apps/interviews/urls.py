from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _
from django.views.generic.base import TemplateView

from .views import *

urlpatterns = [
    url(r'^(?P<pk>[0-9]+)/$', interview, name='interview'),

    url(_(r'^(?P<interview_id>[0-9]+)/start/$'), interview_start, name='interview_start'),
    url(_(r'^(?P<interview_id>[0-9]+)/resume/$'), interview_resume, name='interview_resume'),
    url(_(r'^(?P<interview_id>[0-9]+)/group/(?P<group_id>[0-9]+)$'), interview_group, name='interview_group'),
    url(_(r'^(?P<interview_id>[0-9]+)/done$'), interview_done, name='interview_done'),

    url(_(r'^create/project/(?P<project_id>[0-9]+)/$'), interview_create, name='interview_create'),
    url(_(r'^(?P<pk>[0-9]+)/update$'), InterviewUpdateView.as_view(), name='interview_update'),
    url(_(r'^(?P<pk>[0-9]+)/delete$'), InterviewDeleteView.as_view(), name='interview_delete'),

    # /sections
    url(_(r'^sections/create$'), SectionCreateView.as_view(), name='section_create'),
    url(_(r'^sections/(?P<pk>[0-9]+)/update$'), SectionUpdateView.as_view(), name='section_update'),
    url(_(r'^sections/(?P<pk>[0-9]+)/delete$'), SectionDeleteView.as_view(), name='section_delete'),

    # /subsections
    url(_(r'^subsections/create$'), SubsectionCreateView.as_view(), name='subsection_create'),
    url(_(r'^subsections/(?P<pk>[0-9]+)/update$'), SubsectionUpdateView.as_view(), name='subsection_update'),
    url(_(r'^subsections/(?P<pk>[0-9]+)/delete$'), SubsectionDeleteView.as_view(), name='subsection_delete'),

    # /subsections
    url(_(r'^group/create$'), GroupCreateView.as_view(), name='group_create'),
    url(_(r'^group/(?P<pk>[0-9]+)/update$'), GroupUpdateView.as_view(), name='group_update'),
    url(_(r'^group/(?P<pk>[0-9]+)/delete$'), GroupDeleteView.as_view(), name='group_delete'),

    # /questions
    url(_(r'^questions/$'), questions, name='questions'),
    url(_(r'^questions/sequence/$'), TemplateView.as_view(template_name='interviews/questions_sequence.html'), name='questions_sequence'),
    url(_(r'^questions/sequence.gv/$'), questions_sequence_gv, name='questions_sequence_gv'),
    url(_(r'^questions/create$'), QuestionCreateView.as_view(), name='question_create'),
    url(_(r'^questions/(?P<pk>[0-9]+)/update$'), QuestionUpdateView.as_view(), name='question_update'),
    url(_(r'^questions/(?P<pk>[0-9]+)/delete$'), QuestionDeleteView.as_view(), name='question_delete'),
]