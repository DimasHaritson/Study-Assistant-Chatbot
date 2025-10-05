
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const renderContent = () => {
    // Split by newlines to process line-by-line for lists and headings
    const lines = content.split('\n');
    // FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
    const elements: React.ReactElement[] = [];
    let inList = false;

    lines.forEach((line, index) => {
      // Bold: **text**
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Italic: *text*
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');

      // Headings: ## Heading
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} className="text-xl font-bold mt-4 mb-2" dangerouslySetInnerHTML={{ __html: line.substring(3) }} />);
        inList = false;
        return;
      }
      if (line.startsWith('# ')) {
        elements.push(<h1 key={index} className="text-2xl font-bold mt-5 mb-3" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />);
        inList = false;
        return;
      }
      
      // List items: * or -
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        if (!inList) {
          inList = true;
          elements.push(<ul key={`ul-${index}`} className="list-disc pl-5 my-2"></ul>);
        }
        const lastElement = elements[elements.length - 1];
        if (lastElement && lastElement.type === 'ul') {
          const newLi = <li key={index} dangerouslySetInnerHTML={{ __html: line.trim().substring(2) }} />;
          const newChildren = React.Children.toArray(lastElement.props.children);
          newChildren.push(newLi);
          elements[elements.length-1] = React.cloneElement(lastElement, {}, newChildren);
        }
      } else {
        inList = false;
        // Paragraphs
        if (line.trim()) {
           elements.push(<p key={index} dangerouslySetInnerHTML={{ __html: line }} />);
        }
      }
    });

    return elements;
  };

  return <div className="markdown-content">{renderContent()}</div>;
};

export default MarkdownRenderer;
