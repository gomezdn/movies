import { useEffect, useState } from 'react';
import { VStack, Image, Text, Stack, Heading, Grid } from '@chakra-ui/react';
import { getPersonInfo } from '../../services/getPersonOrTitleInfo';
import { MediaObject, PersonInfoObject, PersonJobs } from '../../Types';
import MediaCard from '../MediaDisplayFormats/MediaCard';

function DisplayJobs(props: { jobs: PersonJobs }) {
  return (
    <VStack w="100%" align="start">
      {props.jobs?.cast[0] ? (
        <VStack w="100%" align="start">
          <Heading fontSize="1.8em" fontFamily="saira">
            Actor
          </Heading>
          <Grid
            gap="1.2em"
            w="100%"
            templateColumns={['1fr', 'repeat(5, 1fr)']}
          >
            {props.jobs?.cast?.map((job) => {
              return <MediaCard object={job} key={String(job.id)} size="200" />;
            })}
          </Grid>
        </VStack>
      ) : (
        ''
      )}

      {props.jobs?.crewJobNames?.map((jobName) => {
        return (
          <VStack w="100%" key={jobName} align="start">
            <Heading fontSize="1.8em" fontFamily="saira">
              {jobName}
            </Heading>
            <Grid
              gap="1.2em"
              w="100%"
              templateColumns={['1fr', 'repeat(5, 1fr)']}
            >
              {props.jobs.crew[jobName].map((job: MediaObject) => {
                return (
                  <MediaCard key={String(job.id)} size="200" object={job} />
                );
              })}
            </Grid>
          </VStack>
        );
      })}
    </VStack>
  );
}

function PersonInfo(props: { id: string; setIsLoading: Function }) {
  const [info, setInfo] = useState({} as PersonInfoObject);

  useEffect(() => {
    props.setIsLoading(true);
    getPersonInfo(props.id).then((res: PersonInfoObject) => {
      setInfo(res);
      document.title = res.name;
      props.setIsLoading(false);
    });
  }, [props.id]);

  return (
    <VStack
      w="min-content"
      align="center"
      color="white"
      fontFamily="liberation-sans"
      spacing={['1em', '3em']}
    >
      <Stack w="100%" spacing="1em" direction={['column', 'row']}>
        {info.image ? (
          <Image src={info.image} rounded="md" maxW="200px" h="auto" />
        ) : (
          ''
        )}
        <VStack align="left" justify="end">
          <Heading
            fontSize={['2em', '2.5em']}
            fontFamily="saira"
            color="yellow.500"
          >
            {info.name}
          </Heading>
          <Text fontFamily="saira">{`Born in ${info.birthday}, ${info.origin}`}</Text>
        </VStack>
      </Stack>
      <Text
        fontFamily="liberation-sans"
        color="whiteAlpha.700"
        w={['100%', '85%']}
        textAlign="justify"
        alignSelf="start"
      >
        {info.biography}
      </Text>
      <VStack align="start" spacing="2em">
        <Heading color="orange">Known for</Heading>
        <DisplayJobs jobs={info.knownFor} />
      </VStack>
    </VStack>
  );
}

export default PersonInfo;
