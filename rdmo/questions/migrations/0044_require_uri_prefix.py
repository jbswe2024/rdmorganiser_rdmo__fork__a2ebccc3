# Generated by Django 2.2.6 on 2019-10-29 12:08

from django.conf import settings
from django.db import migrations, models


def run_data_migration(apps, schema_editor):
    for element in apps.get_model('questions', 'Catalog').objects.all():
        element.uri_prefix = element.uri_prefix or settings.DEFAULT_URI_PREFIX
        element.save()

    for element in apps.get_model('questions', 'Section').objects.all():
        element.uri_prefix = element.uri_prefix or settings.DEFAULT_URI_PREFIX
        element.save()

    for element in apps.get_model('questions', 'QuestionSet').objects.all():
        element.uri_prefix = element.uri_prefix or settings.DEFAULT_URI_PREFIX
        element.save()

    for element in apps.get_model('questions', 'Question').objects.all():
        element.uri_prefix = element.uri_prefix or settings.DEFAULT_URI_PREFIX
        element.save()


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0043_django2'),
    ]

    operations = [
        migrations.RunPython(run_data_migration),
        migrations.AlterField(
            model_name='catalog',
            name='uri_prefix',
            field=models.URLField(help_text='The prefix for the URI of this catalog.', max_length=256, verbose_name='URI Prefix'),
        ),
        migrations.AlterField(
            model_name='question',
            name='uri_prefix',
            field=models.URLField(help_text='The prefix for the URI of this question.', max_length=256, verbose_name='URI Prefix'),
        ),
        migrations.AlterField(
            model_name='questionset',
            name='uri_prefix',
            field=models.URLField(help_text='The prefix for the URI of this questionset.', max_length=256, verbose_name='URI Prefix'),
        ),
        migrations.AlterField(
            model_name='section',
            name='uri_prefix',
            field=models.URLField(help_text='The prefix for the URI of this section.', max_length=256, verbose_name='URI Prefix'),
        ),
    ]
