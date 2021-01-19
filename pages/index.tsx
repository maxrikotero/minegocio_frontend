import { ComponentType } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Home = (props: any) => {

    const characters = useSelector(state => state.characters);
    const dispatch = useDispatch();

    console.log(characters.list, 'as')
    const addCharacter = ( personaje : any) => {
        console.log(personaje, 'CHAR')
        dispatch({
            type: 'ADD_CHARACTER',
            data: {
                id: personaje.id,
                name: personaje.name,
                image: personaje.image
            }
          });
    }
    


    return ( 
        <div>

            <h1> Rick and Morty list of characters:</h1>
            <WrapperCharacters>
                <CarouselWrapper>
                <Carousel responsive={responsive}>
                    {props.characters.map(((personaje: any) => {
                        return(
                            <BoxWrapper>
                                <h3> {personaje.name} </h3>
                                <img src={personaje.image}/>
                                <button onClick={()=> addCharacter(personaje)}> ADD CHARACTER</button>
                            </BoxWrapper>
                        )
                    }))}
                </Carousel>
                </CarouselWrapper>
                <ListWrapper>
                    {characters.list.map((item: any) => {
                        return(
                            <BoxChar img={item.image} key={item.id}>

                            </BoxChar>
                        )
                    })}

                </ListWrapper>
            </WrapperCharacters>
        </div>
     );
}
 
export default Home;


export const CarouselWrapper : ComponentType = styled.div`
width:30vw;
height:fit-content;
background:dodgerblue;
padding:10px;
`;
export const BoxWrapper = styled.div`
display:grid;
justify-content:center;
justify-items:center;
`;
export const ListWrapper = styled.div`
display:grid;
grid-template-columns:150px 150px 150px 150px 150px;
grid-template-rows:150px 150px 150px 150px;
`;
export const WrapperCharacters = styled.div`
padding:5% 5% 0 5%;
display:grid;
grid-template-columns: 1fr 1fr;
`;
export const BoxChar = styled.div`
width:100%;
height:100%;
background-image: url('${props => props.img}');
background-size:cover;
`;
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
