import React from 'react';
// Components
import {Flex} from '@chakra-ui/react';
import Success from '../../Components/EmailVerification/Success';
import Pending from '../../Components/EmailVerification/Pending';
import Expired from '../../Components/EmailVerification/Expired';
// Constants
import { VERIFIED_PENDING, VERIFIED_EXPIRED } from './constant';
// Router
import { useLocation, useSearchParams } from 'react-router-dom';

const EmailVerification = () => {
  
  // Router Methods
  const {state} = useLocation();
  const [searchParams] = useSearchParams();
  // Params
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  return (
    <Flex>
     {
         id && token
         ? <Success id={id} token={token} />
         : state?.type === VERIFIED_PENDING 
         ? <Pending />
         : state?.type === VERIFIED_EXPIRED 
         ? <Expired />
         : ''
     }
    </Flex>
  )
}

export default EmailVerification