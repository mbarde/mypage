import { defineMessages } from 'react-intl';

const messages = defineMessages({
  labelSettings: {
    id: 'Settings',
    defaultMessage: 'Settings',
  },
  labelDate: {
    id: 'Date',
    defaultMessage: 'Date',
  },
  labelSelectPerson: {
    id: 'Select person',
    defaultMessage: 'Select person',
  },
  labelDownloads: {
    id: 'Downloads',
    defaultMessage: 'Downloads',
  },
  descrDownloads: {
    id: 'Select files',
    defaultMessage: 'Select files',
  },
});

export const ButtonSchema = (intl) => {
  return {
    title: intl.formatMessage(messages.labelSettings),
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['date', 'author', 'downloads'],
      },
    ],

    properties: {
      date: {
        title: intl.formatMessage(messages.labelDate),
        type: 'date',
        widget: 'date',
        widgetOptions: {
          dateOnly: true,
        },
      },
      author: {
        title: intl.formatMessage(messages.labelSelectPerson),
        widget: 'object_browser',
        widgetOptions: {
          pattern_options: { selectableTypes: ['Person'] },
        },
        mode: 'link',
        selectedItemAttrs: ['Title'],
      },
      downloads: {
        title: intl.formatMessage(messages.labelDownloads),
        description: intl.formatMessage(messages.descrDownloads),
        widget: 'object_browser',
        widgetOptions: {
          pattern_options: { selectableTypes: ['File', 'Image'] },
        },
        selectedItemAttrs: ['Title', 'Description', '@type'],
      },
    },
    required: [],
  };
};

export default ButtonSchema;
