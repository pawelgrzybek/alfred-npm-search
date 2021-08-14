interface Meta {
  page: number;
  resultsPerPage: number;
  time: number;
  totalCount: number;
  totalPages: number;
}

interface Result {
  createdAt: Date;
  description: string;
  hasTypes: true;
  isDeprecated: false;
  maintainers: [{ name: string; email: string }];
  name: string;
  popularityScore: number;
  projectType: string;
  updatedAt: Date;
}

interface Response {
  meta: Meta;
  results: Result[];
}

try {
  const res = await fetch(
    `https://api.skypack.dev/v1/search?q=${Deno.args[0]}`
  );
  const body: Response = await res.json();

  const packages = {
    items: body.results.map((item) => {
      return {
        title: `${item.name}`,
        subtitle: `${item.description} ${item.hasTypes ? "(TS ready)" : ""}`,
        arg: `https://www.skypack.dev/view/${item.name}`,
        text: {
          copy: `https://www.skypack.dev/view/${item.name}`,
          largetype: `https://www.skypack.dev/view/${item.name}`,
        },
      };
    }),
  };

  console.log(JSON.stringify(packages));
} catch (error) {
  console.log(
    JSON.stringify({
      items: [
        {
          title: error.name,
          subtitle: error.message,
          valid: false,
          text: {
            copy: error.stack,
          },
        },
      ],
    })
  );
}
