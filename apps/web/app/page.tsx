import { Badge, Card, Container, Heading, Section, Text } from "@/components/ui";

export default function HomePage() {
  return (
    <main id="main-content" className="bg-canvas text-navy">
      <Section
        surface="ivory"
        spacing="spacious"
        aria-labelledby="foundation-heading"
        className="flex min-h-[65vh] items-center"
      >
        <Container size="narrow">
          <Card surface="sand">
            <Badge variant="gold">Phase 04 — Global Layout & Navigation</Badge>
            <Heading as="h1" id="foundation-heading" className="mt-4">
              NAVOSYS Web Workspace Initialized
            </Heading>
            <Text variant="lead" className="mt-4 text-navy-muted">
              Strapi-managed global settings, nested navigation, brand assets,
              and footer are connected. Dynamic page routing, section builder,
              and content pages remain scheduled for subsequent phases.
            </Text>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
