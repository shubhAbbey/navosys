import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui";

export default function NotFound() {
  return (
    <main id="main-content" className="bg-canvas text-navy">
      <Section
        surface="ivory"
        spacing="spacious"
        aria-labelledby="not-found-heading"
        className="flex min-h-[65vh] items-center"
      >
        <Container size="narrow">
          <Card surface="sand" className="mx-auto max-w-lg">
            <Badge variant="neutral">404</Badge>
            <Heading as="h1" id="not-found-heading" className="mt-4">
              Page not found
            </Heading>
            <Text variant="muted" className="mt-3">
              The requested route is not available in this initialization
              workspace.
            </Text>
            <div className="mt-6">
              <ButtonLink href="/" variant="outline">
                Return home
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}
