import { Button, SnippetCard, SourceLink } from '@portfolio/ui';

const ButtonPage = () => {
  return (
    <>
      <SourceLink
        href={
          'https://github.com/masterhyuns/front-portfolio/tree/main/libs/ui/src/components/button'
        }
      />
      <h2>Buttons</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
        }}
      >
        <SnippetCard
          title="Primary Button"
          codeSnippet={`<Button variant="primary">Primary</Button>`}
        >
          <Button variant="primary" onClick={() => alert('1234')}>
            Primary
          </Button>
        </SnippetCard>

        <SnippetCard
          title="Secondary Button"
          codeSnippet={`<Button variant="secondary">Secondary</Button>`}
        >
          <Button variant="secondary">Secondary</Button>
        </SnippetCard>

        <SnippetCard
          title="Success Button"
          codeSnippet={`<Button variant="success">Success</Button>`}
        >
          <Button variant="success">Success</Button>
        </SnippetCard>

        <SnippetCard
          title="Warning Button"
          codeSnippet={`<Button variant="warning">Warning</Button>`}
        >
          <Button variant="warning">Warning</Button>
        </SnippetCard>

        <SnippetCard
          title="Danger Button"
          codeSnippet={`<Button variant="danger">Danger</Button>`}
        >
          <Button variant="danger">Danger</Button>
        </SnippetCard>

        <SnippetCard
          title="Small Button"
          codeSnippet={`<Button variant="primary" size="sm">Small</Button>`}
        >
          <Button variant="primary" size="sm">
            Small
          </Button>
        </SnippetCard>

        <SnippetCard
          title="Medium Button"
          codeSnippet={`<Button variant="primary" size="md">Medium</Button>`}
        >
          <Button variant="primary" size="md">
            Medium
          </Button>
        </SnippetCard>

        <SnippetCard
          title="Large Button"
          codeSnippet={`<Button variant="primary" size="lg">Large</Button>`}
        >
          <Button variant="primary" size="lg">
            Large
          </Button>
        </SnippetCard>
      </div>
    </>
  );
};
export default ButtonPage;
