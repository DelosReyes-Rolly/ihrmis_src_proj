export const BreadCrumbsData = () => {

  let plantillaItemsBreadcrumbDefault = [
    {
      name: "Home",
      link: "./"
    },
    {
      name: "Plantilla", 
      link: "#"
    } 
  ];
    
  const getBreadcrumbData = (page) => {

    switch (page){
      case 'employee' : {

        let breadcrumbData = plantillaItemsBreadcrumbDefault.push(
          {
            name: "Employee",
            link: "#"
          } 
        );

        return breadcrumbData;
      }
      case 'items' : {

        let breadcrumbData = plantillaItemsBreadcrumbDefault.push(
          {
            name: "Plantilla Items",
            link: "#"
          }
        );

        return breadcrumbData;
      }
      case 'vacant' : {

        let breadcrumbData = plantillaItemsBreadcrumbDefault.push(
          {
          
            name: "Vacant Positions",
            link: "#"
          }
        );

        return breadcrumbData;
      }
      case 'info' : {

        let breadcrumbData = plantillaItemsBreadcrumbDefault.push(
          {
            name: "info",
            link: "#"
          }
        );

        return breadcrumbData;
      }
      default : {
        return plantillaItemsBreadcrumbDefault;
      }
    }
  }

  return {

    getBreadcrumbData
  }
}