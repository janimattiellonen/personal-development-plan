import {ExerciseType} from "../../../types/types";

import styled from "@emotion/styled";

import {nlToBr} from "../../../utils/text";

import {Raw} from "../../../components/Raw";
import {Heading, Text} from "@radix-ui/themes";


const Div = styled.div`
margin-bottom: var(--space-xl);
`;

type ExerciseProps = {
  exercise: ExerciseType;
}
export function ExerciseItem({exercise}: ExerciseProps) {
  return (
    <Div>
      <Heading as="h3">{exercise.name}</Heading>

      <Heading as="h4">Description</Heading>
      <div><Text size="4">{exercise.description}</Text></div>

      <Heading as="h4">Instructions</Heading>
      <div><Text><Raw content={nlToBr(exercise.instructions)}/></Text></div>
    </Div>
  );
}
