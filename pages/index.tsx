import { useState } from 'react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
 
const Home = (props: any) => {

    return ( 
        <div>
            <h1> Rick and Morty list of characters:</h1>
            {props.characters.map((personaje => {
                return(
                    <div>
                        <h3> {personaje.name} </h3>
                        <img src={personaje.image}/>
                    </div>
                )
            }))}
        </div>
     );
}
 
export default Home;

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: 'https://rickandmortyapi.com/graphql',
        cache: new InMemoryCache()
    });

    const {data} = await client.query({
        query: gql`
        query{
            characters(page: 1){
              results{
                id
                name
                image
                location{
                  id
                  name
                  dimension
                }
              }
            }
          }
        `
    });

    return {
        props: {
            characters: data.characters.results
        }
    }

}