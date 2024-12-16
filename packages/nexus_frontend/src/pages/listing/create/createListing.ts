const createListing = async (options: {
  discordToken: string;
  listing: Record<
    "splat" | "description" | "edition" | "medium" | "title" | "schedule",
    string
  > &
    Record<"players" | "cost", number>
    &
    Record <"paid", boolean>;
}) => {
  const response = await fetch(process.env.REACT_APP_API_GATEWAY as string, {
    method: "POST",
    body: JSON.stringify(options),
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export default createListing;
