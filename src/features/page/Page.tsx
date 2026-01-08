import { useAppContext } from "../../contexts/AppContext";

export const Page = () => {
  const { selectedFeature } = useAppContext();

  return (
    <div>
      {selectedFeature ? (
        <div>
          <p>{selectedFeature.description}</p>
        </div>
      ) : (
        <p>Sélectionnez un élément dans le menu</p>
      )}
    </div>
  );
};
