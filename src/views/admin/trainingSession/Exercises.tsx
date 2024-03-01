import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


import{fetchTrainingSession} from "./exercise";

import {ExerciseTable} from "../exercise/ExerciseTable";

import {TrainingSessionType} from "../developmentPlan/developmentPlan";

import {removeExerciseFromTrainingSession} from "../exercise/exercise";

import {AvailableExercises} from "./AvailableExercises";
import {Heading} from "@radix-ui/themes";

export default function Exercises() {
  const [trainingSession, setTrainingSession] = useState<TrainingSessionType | null>(null);
  const [timestamp, setTimestamp] = useState<number>(0);
  const { id } = useParams();

  const trainingSessionId = parseInt(id || '', 10);

  const fetchTrainingSessionData = async () => {
    const response = await fetchTrainingSession(trainingSessionId);
    const json = await response.json();

    const data = json.data;
    setTrainingSession(data);
  }

  useEffect(() => {
    fetchTrainingSessionData();
  }, [trainingSessionId]);

  return (
    <div>
      <Heading as="h2">Exercises added to training session</Heading>

      {trainingSession && (
        <ExerciseTable
          remove={(id) => removeExerciseFromTrainingSession(id, trainingSessionId)} data={trainingSession?.exercises || []}
          refresh={() => {
            fetchTrainingSessionData();
            setTimestamp(Date.now());
          }}
        />
      )}

      <AvailableExercises trainingSessionId={trainingSessionId} ts={timestamp} refresh={fetchTrainingSessionData} />
    </div>
  );
}
