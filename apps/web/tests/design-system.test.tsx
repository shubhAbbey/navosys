import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  Alert,
  Badge,
  Button,
  ButtonLink,
  Card,
  Checkbox,
  Container,
  FormField,
  Heading,
  Input,
  Section,
  Select,
  Text,
  Textarea,
} from "@/components/ui";
import {
  APPROVED_CONTRAST_PAIRS,
  NAVOSYS_COLORS,
} from "@/lib/design/tokens";

function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : Math.pow((channel + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

describe("P03 Design System Tokens & WCAG 2.2 AA Contrast", () => {
  it("defines the exact approved NAVOSYS base palette", () => {
    expect(NAVOSYS_COLORS.warmIvory).toBe("#FAF8F5");
    expect(NAVOSYS_COLORS.sand).toBe("#E9E4DC");
    expect(NAVOSYS_COLORS.deepNavy).toBe("#23364D");
    expect(NAVOSYS_COLORS.mutedTeal).toBe("#6F9690");
    expect(NAVOSYS_COLORS.warmGold).toBe("#C89F79");
  });

  it("ensures all approved contrast pairs meet their WCAG 2.2 AA minimum ratios", () => {
    for (const pair of APPROVED_CONTRAST_PAIRS) {
      const measured = contrastRatio(pair.foreground, pair.background);
      expect(
        measured,
        `${pair.name} (${pair.foreground} on ${pair.background}) measured ${measured.toFixed(2)}:1`
      ).toBeGreaterThanOrEqual(pair.minimumRatio);
    }
  });

  it("confirms white text on base teal or gold fails AA normal text and is avoided", () => {
    expect(contrastRatio("#FFFFFF", NAVOSYS_COLORS.mutedTeal)).toBeLessThan(
      4.5
    );
    expect(contrastRatio("#FFFFFF", NAVOSYS_COLORS.warmGold)).toBeLessThan(4.5);
  });
});

describe("P03 Lightweight UI Primitives", () => {
  it("renders Button variants and ButtonLink with accessible labels", () => {
    render(
      <>
        <Button variant="primary">Get a Quote</Button>
        <Button variant="secondary" disabled>
          Disabled Action
        </Button>
        <ButtonLink href="/contact" variant="outline">
          Book a Consultation
        </ButtonLink>
      </>
    );

    const primary = screen.getByRole("button", { name: "Get a Quote" });
    expect(primary).toHaveAttribute("type", "button");
    expect(primary).toHaveClass("bg-teal-deep", "text-canvas");

    expect(
      screen.getByRole("button", { name: "Disabled Action" })
    ).toBeDisabled();

    const link = screen.getByRole("link", { name: "Book a Consultation" });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders Section, Container, Card, Heading, Text, and Badge surfaces", () => {
    render(
      <Section surface="sand" aria-label="Capabilities">
        <Container size="wide">
          <Card surface="ivory">
            <Badge variant="teal">Verified Pattern</Badge>
            <Heading as="h2">Architecture</Heading>
            <Text variant="muted">Server-first UI foundation.</Text>
          </Card>
        </Container>
      </Section>
    );

    const region = screen.getByRole("region", { name: "Capabilities" });
    expect(region).toHaveClass("bg-sand", "text-navy");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Architecture"
    );
    expect(screen.getByText("Verified Pattern")).toHaveClass(
      "bg-teal",
      "text-navy-deep"
    );
  });

  it("renders accessible FormField controls with aria-invalid and error alert text", () => {
    render(
      <form>
        <FormField
          id="email"
          label="Business email"
          required
          hint="Use your company email."
          error="Please enter a valid work email."
        >
          <Input
            id="email"
            type="email"
            hasError
            aria-describedby="email-hint email-error"
          />
        </FormField>
        <FormField id="service" label="Service">
          <Select id="service" defaultValue="cloud">
            <option value="cloud">Cloud & IT</option>
          </Select>
        </FormField>
        <FormField id="notes" label="Project details">
          <Textarea id="notes" />
        </FormField>
        <Checkbox id="consent" label="I agree to the privacy policy." />
      </form>
    );

    const input = screen.getByLabelText(/Business email/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Error: Please enter a valid work email."
    );
    expect(screen.getByLabelText("Service")).toBeInTheDocument();
    expect(screen.getByLabelText("Project details")).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "I agree to the privacy policy." })
    ).toBeInTheDocument();
  });

  it("renders Alert banners using text labels as well as color", () => {
    render(
      <>
        <Alert variant="success">Submission received.</Alert>
        <Alert variant="error" title="Delivery failed">
          Please email us directly.
        </Alert>
      </>
    );

    expect(screen.getByRole("status")).toHaveTextContent("Success");
    expect(screen.getByRole("alert")).toHaveTextContent("Delivery failed");
  });
});
