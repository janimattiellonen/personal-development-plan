import React, {useEffect, useState} from 'react';

import {CategoryType} from "../types/types";

import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import {Checkbox} from "./Checkbox";

import {getCategories} from "../views/admin/category/category";


type AccordionDemoProps = {
  onSelectCategories: (categories: number[]) => void
}
const AccordionDemo = ({onSelectCategories}: AccordionDemoProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const onSelect = (categoryId: number, value: boolean) => {2
    const index = selected.findIndex((item) => item === categoryId);
    if (index === -1) {
      setSelected([...selected, categoryId]);
    } else {
      const newSelected = [...selected];
      if (value) {
        newSelected[index] = categoryId;
      } else {
        newSelected.splice(index, 1);
      }
      setSelected(newSelected);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      const json = await response.json();

      setCategories(json.data);
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    onSelectCategories(selected);
  }, [selected]);

  return (
    <Accordion.Root className="AccordionRoot" type="multiple" defaultValue={['item-1', 'item-2', 'item-3']}>

      {categories.map((category) => {
        return (
          <Accordion.Item className="AccordionItem" value={"" + category.id}>
            <AccordionTrigger>{category.name}</AccordionTrigger>
            {category.children && category.children.map((childCategory) => {
                return (
                  <AccordionContent>
                    <Checkbox name={childCategory.name} id={`category-${childCategory.id}`} label={childCategory.name} onChange={(value) => onSelect(childCategory.id, value)} />
                  </AccordionContent>
                );
            })}

          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
};

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));

export default AccordionDemo;
