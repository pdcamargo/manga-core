import {
  Breadcrumb as BreadcrumbChakra,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from "@chakra-ui/react";

const Breadcrumb: React.FC<{ items: { href?: string; text: string }[] }> = ({
  items,
}) => {
  const itemsColor = useColorModeValue("gray.800", "white");

  return (
    <BreadcrumbChakra>
      {items.map((item, index) => (
        <BreadcrumbItem key={item.text} fontSize="small" isCurrentPage>
          <BreadcrumbLink
            opacity={index === 0 ? 1 : 0.75}
            color={itemsColor}
            href={item.href}
          >
            {item.text}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </BreadcrumbChakra>
  );
};

export default Breadcrumb;
