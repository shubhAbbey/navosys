import { Badge, Card, Container, Heading, Section, Text } from "@/components/ui";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-canvas text-navy">
      <Section
        surface="ivory"
        spacing="spacious"
        aria-labelledby="foundation-heading"
        className="flex min-h-screen items-center"
      >
        <Container size="narrow">
          <Card surface="sand">
            <Badge variant="gold">Phase 03 — Design System Foundation</Badge>
            <Heading as="h1" id="foundation-heading" className="mt-4">
              NAVOSYS Web Workspace Initialized
            </Heading>
            <Text variant="lead" className="mt-4 text-navy-muted">
              Design tokens, approved theme surfaces, accessible typography,
              and lightweight UI primitives are configured. CMS schemas, global
              navigation, and dynamic routes remain scheduled for subsequent
              phases.
            </Text>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
