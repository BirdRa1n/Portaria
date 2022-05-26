import { Heading, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import {View, Box, NativeBaseProvider, Text, Center} from 'native-base';
export default function Account(){
    return(
        <NativeBaseProvider>
            <View w={'100%'} h={'100%'}>
                <Center w={'100%'} h={'100%'}>
                    <Heading size={'sm'}>Em desenvolvimento</Heading>
                    <Text>Tela: Account</Text>
                </Center>
            </View>
        </NativeBaseProvider>
    );
}