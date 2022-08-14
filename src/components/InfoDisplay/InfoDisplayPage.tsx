import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@chakra-ui/react';
import PersonInfo from './PersonInfo';
import TitleInfo from './TitleInfo';

function InfoDisplayPage() {
  const { id, type } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <VStack
      w="100%"
      align="center"
      mt={['9em', '5em']}
      p="2em"
      visibility={isLoading ? 'hidden' : 'visible'}
    >
      {type == 'person' ? (
        <PersonInfo setIsLoading={setIsLoading} id={id!} />
      ) : (
        <TitleInfo setIsLoading={setIsLoading} id={id!} type={type!} />
      )}
    </VStack>
  );
}

export { InfoDisplayPage };
