export function parseOgResult(data:any) {
    if (data && data.success) {
      return {
        success: 1,
        link: data.requestUrl,
        meta: {
          title: data.ogTitle,
          site_name: data.ogSiteName,
          description: data.ogDescription,
          ...(data.ogImage
            ? {
                image: {
                  url: data.ogImage?.[0].url,
                  type: data.ogImage?.[0].type,
                },
              }
            : {}),
        },
      };
    } else {
      return {
        success: 0,
        link: data.requestUrl,
        meta: {},
      };
    }
  }
  