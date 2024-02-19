import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../queries';
import styled from 'styled-components';

const CharacterListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
`;

const CharacterCard = styled.div`
  flex: 0 0 calc(2% - 10px);
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
`;

const CenteredTitle = styled.h2`
  text-align: center;
`;

const CharacterList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { characters } = data;
  const { info, results } = characters;

  const nextPage = () => {
    if (info.next) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (info.prev) {
      setPage(page - 1);
    }
  };

  const handleCharacterClick = (character: any) => {
    setSelectedCharacter(character);
  };

  return (
    <div>
      <CenteredTitle>Characters</CenteredTitle>
      <CharacterListContainer>
        {results.map((character: any) => (
          <CharacterCard key={character.id} onClick={() => handleCharacterClick(character)}>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
          </CharacterCard>
        ))}
      </CharacterListContainer>
      <div>
        <button onClick={prevPage} disabled={!info.prev}>Page précédente</button>
        <span>Page {page} sur {info.pages}</span>
        <button onClick={nextPage} disabled={!info.next}>Page suivante</button>
      </div>
      {selectedCharacter && (
        <div>
          <h3>Détails du personnage</h3>
          <p>Nom: {selectedCharacter.name}</p>
          <p>Gender: {selectedCharacter.gender}</p>
          <p>Status: {selectedCharacter.status}</p>
          <p>Species: {selectedCharacter.species}</p>
          <p>Type: {selectedCharacter.type}</p>
          <p>Origin Name: {selectedCharacter.origin.name}</p>
          <p>Origin Dimension: {selectedCharacter.origin.dimension}</p>
          <p>Location Name: {selectedCharacter.location.name}</p>
          <p>Location Dimension: {selectedCharacter.location.dimension}</p>
        </div>
      )}
    </div>
  );
};

export default CharacterList;