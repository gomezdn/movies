import { Flex } from '@chakra-ui/react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AppRoutes } from '../AppRoutes';

export default function WebsiteLayout() {
  return (
    <Flex
      w="100%"
      h="100%"
      align="center"
      fontFamily="roboto"
      direction="column"
    >
      <Header />
      <AppRoutes />
      <Footer />
    </Flex>
  );
}
