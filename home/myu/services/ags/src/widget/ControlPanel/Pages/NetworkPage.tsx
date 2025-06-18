import { Page } from "./Page";

export const networkPageName = "Network";

export const NetworkPage = ({
  setPageName,
}: {
  setPageName: (name: string) => void;
}) => {
  return (
    <Page
      name={networkPageName}
      child={<label>Network</label>}
      setPageName={setPageName}
    />
  );
};
