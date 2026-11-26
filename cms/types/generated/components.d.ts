import type { Schema, Struct } from '@strapi/strapi';

export interface NavigationFooterColumn extends Struct.ComponentSchema {
  collectionName: 'components_navigation_footer_columns';
  info: {
    displayName: 'Footer Column';
    icon: 'layout';
  };
  attributes: {
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    links: Schema.Attribute.Component<'shared.link', true>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationNavChildItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_child_items';
  info: {
    displayName: 'Nav Child Item';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavigationNavItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_nav_items';
  info: {
    displayName: 'Nav Item';
    icon: 'list';
  };
  attributes: {
    children: Schema.Attribute.Component<'navigation.nav-child-item', true>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_grids';
  info: {
    displayName: 'Card Grid';
    icon: 'grid';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    columns: Schema.Attribute.Enumeration<['2', '3', '4']> &
      Schema.Attribute.DefaultTo<'3'>;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    eyebrow: Schema.Attribute.String;
    gridKind: Schema.Attribute.Enumeration<
      [
        'features',
        'services',
        'industries',
        'insights',
        'case_studies',
        'technologies',
        'related_services',
        'related_articles',
      ]
    > &
      Schema.Attribute.DefaultTo<'features'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'shared.feature-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsComparisonTable extends Struct.ComponentSchema {
  collectionName: 'components_sections_comparison_tables';
  info: {
    displayName: 'Comparison Table';
    icon: 'grid';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    primaryColumnLabel: Schema.Attribute.String & Schema.Attribute.Required;
    rows: Schema.Attribute.Component<'shared.comparison-row', true>;
    secondaryColumnLabel: Schema.Attribute.String & Schema.Attribute.Required;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    displayName: 'CTA Banner';
    icon: 'cursor';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'navy'>;
    variant: Schema.Attribute.Enumeration<['banner', 'footer_cta']> &
      Schema.Attribute.DefaultTo<'banner'>;
  };
}

export interface SectionsFaqAccordion extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_accordions';
  info: {
    displayName: 'FAQ Accordion';
    icon: 'question';
  };
  attributes: {
    allowMultiple: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'shared.faq-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsFormPlaceholder extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_placeholders';
  info: {
    displayName: 'Form Section Hook';
    icon: 'envelope';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get a Quote'>;
    eyebrow: Schema.Attribute.String;
    formKind: Schema.Attribute.Enumeration<
      ['contact', 'quote', 'consultation', 'assessment', 'newsletter']
    > &
      Schema.Attribute.DefaultTo<'quote'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'sand'>;
    targetRoute: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/contact/get-quote'>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
    icon: 'landscape';
  };
  attributes: {
    alignment: Schema.Attribute.Enumeration<['left', 'center']> &
      Schema.Attribute.DefaultTo<'left'>;
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    media: Schema.Attribute.Media<'images'>;
    mediaAlt: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'spacious'>;
    subheading: Schema.Attribute.Text;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsImageGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_galleries';
  info: {
    displayName: 'Image Gallery';
    icon: 'picture';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    columns: Schema.Attribute.Enumeration<['2', '3']> &
      Schema.Attribute.DefaultTo<'3'>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'shared.gallery-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsImageText extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_texts';
  info: {
    displayName: 'Image & Text';
    icon: 'picture';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    media: Schema.Attribute.Media<'images'>;
    mediaAlt: Schema.Attribute.String;
    mediaPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'right'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'sand'>;
  };
}

export interface SectionsLogoGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_logo_grids';
  info: {
    displayName: 'Approved Logo Grid';
    icon: 'star';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'shared.logo-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'compact'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsProcessSteps extends Struct.ComponentSchema {
  collectionName: 'components_sections_process_steps';
  info: {
    displayName: 'Process & Timeline';
    icon: 'bulletList';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    layout: Schema.Attribute.Enumeration<['steps', 'timeline']> &
      Schema.Attribute.DefaultTo<'steps'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    steps: Schema.Attribute.Component<'shared.step-item', true>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsQuoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_quote_blocks';
  info: {
    displayName: 'Quote Block';
    icon: 'quote';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    attribution: Schema.Attribute.String;
    isVerified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'compact'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'sand'>;
    variant: Schema.Attribute.Enumeration<['editorial', 'testimonial']> &
      Schema.Attribute.DefaultTo<'editorial'>;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_texts';
  info: {
    displayName: 'Rich Text';
    icon: 'file';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    maxWidth: Schema.Attribute.Enumeration<['narrow', 'default']> &
      Schema.Attribute.DefaultTo<'narrow'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsSplitHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_split_heroes';
  info: {
    displayName: 'Split Hero';
    icon: 'layout';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    highlights: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    media: Schema.Attribute.Media<'images'>;
    mediaAlt: Schema.Attribute.String;
    mediaPosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'right'>;
    primaryCta: Schema.Attribute.Component<'shared.cta', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta', false>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    subheading: Schema.Attribute.Text;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsStats extends Struct.ComponentSchema {
  collectionName: 'components_sections_stats';
  info: {
    displayName: 'Stats (Verified Only)';
    icon: 'chartCircle';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'shared.stat-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'compact'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'sand'>;
  };
}

export interface SectionsTabs extends Struct.ComponentSchema {
  collectionName: 'components_sections_tabs';
  info: {
    displayName: 'Tabs';
    icon: 'apps';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'sand'>;
    tabs: Schema.Attribute.Component<'shared.tab-item', true>;
  };
}

export interface SectionsTeamGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_team_grids';
  info: {
    displayName: 'Team Grid (Approved Only)';
    icon: 'user';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    members: Schema.Attribute.Component<'shared.team-member', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
  };
}

export interface SectionsTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonials (Verified Only)';
    icon: 'quote';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    items: Schema.Attribute.Component<'shared.testimonial-item', true>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'sand'>;
  };
}

export interface SectionsVideoEmbed extends Struct.ComponentSchema {
  collectionName: 'components_sections_video_embeds';
  info: {
    displayName: 'Video Embed';
    icon: 'play';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    embedUrl: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    posterImage: Schema.Attribute.Media<'images'>;
    sortOrder: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    spacing: Schema.Attribute.Enumeration<['compact', 'default', 'spacious']> &
      Schema.Attribute.DefaultTo<'default'>;
    surface: Schema.Attribute.Enumeration<['ivory', 'sand', 'navy']> &
      Schema.Attribute.DefaultTo<'ivory'>;
    videoFile: Schema.Attribute.Media<'videos'>;
  };
}

export interface SharedAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_shared_announcements';
  info: {
    displayName: 'Announcement';
    icon: 'bell';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    dismissible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    enabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
  };
}

export interface SharedComparisonRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_comparison_rows';
  info: {
    displayName: 'Comparison Row';
    icon: 'grid';
  };
  attributes: {
    feature: Schema.Attribute.String & Schema.Attribute.Required;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    primaryValue: Schema.Attribute.String & Schema.Attribute.Required;
    secondaryValue: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    displayName: 'CTA';
    icon: 'cursor';
  };
  attributes: {
    isVisible: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    displayName: 'Feature Item';
    icon: 'bulletList';
  };
  attributes: {
    badge: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    href: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedGalleryItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_gallery_items';
  info: {
    displayName: 'Gallery Item';
    icon: 'picture';
  };
  attributes: {
    altOverride: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLogoItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_logo_items';
  info: {
    displayName: 'Logo Item';
    icon: 'star';
  };
  attributes: {
    altText: Schema.Attribute.String;
    isApproved: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    url: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    noFollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    structuredDataType: Schema.Attribute.Enumeration<
      ['WebPage', 'AboutPage', 'ContactPage', 'CollectionPage', 'FAQPage']
    > &
      Schema.Attribute.DefaultTo<'WebPage'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
    icon: 'globe';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    platform: Schema.Attribute.Enumeration<
      ['linkedin', 'github', 'x', 'youtube', 'email']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'Stat Item';
    icon: 'chartBubble';
  };
  attributes: {
    context: Schema.Attribute.String;
    isVerified: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    sourceNote: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStepItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_step_items';
  info: {
    displayName: 'Step Item';
    icon: 'layer';
  };
  attributes: {
    deliverable: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    stepNumber: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTabItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_tab_items';
  info: {
    displayName: 'Tab Item';
    icon: 'apps';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    highlights: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_shared_team_members';
  info: {
    displayName: 'Team Member';
    icon: 'user';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    isApproved: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    photo: Schema.Attribute.Media<'images'>;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonial_items';
  info: {
    displayName: 'Testimonial Item';
    icon: 'quote';
  };
  attributes: {
    authorName: Schema.Attribute.String;
    authorRole: Schema.Attribute.String;
    isVerified: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    organization: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'navigation.footer-column': NavigationFooterColumn;
      'navigation.nav-child-item': NavigationNavChildItem;
      'navigation.nav-item': NavigationNavItem;
      'sections.card-grid': SectionsCardGrid;
      'sections.comparison-table': SectionsComparisonTable;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.faq-accordion': SectionsFaqAccordion;
      'sections.form-placeholder': SectionsFormPlaceholder;
      'sections.hero': SectionsHero;
      'sections.image-gallery': SectionsImageGallery;
      'sections.image-text': SectionsImageText;
      'sections.logo-grid': SectionsLogoGrid;
      'sections.process-steps': SectionsProcessSteps;
      'sections.quote-block': SectionsQuoteBlock;
      'sections.rich-text': SectionsRichText;
      'sections.split-hero': SectionsSplitHero;
      'sections.stats': SectionsStats;
      'sections.tabs': SectionsTabs;
      'sections.team-grid': SectionsTeamGrid;
      'sections.testimonials': SectionsTestimonials;
      'sections.video-embed': SectionsVideoEmbed;
      'shared.announcement': SharedAnnouncement;
      'shared.comparison-row': SharedComparisonRow;
      'shared.cta': SharedCta;
      'shared.faq-item': SharedFaqItem;
      'shared.feature-item': SharedFeatureItem;
      'shared.gallery-item': SharedGalleryItem;
      'shared.link': SharedLink;
      'shared.logo-item': SharedLogoItem;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.stat-item': SharedStatItem;
      'shared.step-item': SharedStepItem;
      'shared.tab-item': SharedTabItem;
      'shared.team-member': SharedTeamMember;
      'shared.testimonial-item': SharedTestimonialItem;
    }
  }
}
