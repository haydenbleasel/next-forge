import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionListProps {
  items: AccordionItem[];
  accordionProps?: any; // TODO: fix type
}

export const AccordionList: React.FC<AccordionListProps> = ({
  items,
  accordionProps,
}) => {
  return (
    <Accordion type="single" collapsible {...accordionProps}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index + 1}`}
          className="my-md p-sm"
        >
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>
            <div className="px-sm">
              <Separator />
            </div>
            <p className="pt-md">{item.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
