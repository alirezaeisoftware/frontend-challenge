

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string;
  links: {
    patch:{
      small: string;
      large: string;
    }
  }
}

export interface LaunchResponse {
  docs: Launch[];
  totalPages: number;
}

export interface MainComponent {
  initialData: LaunchResponse;
  initialPage: number;
  initialSearch: string;
}

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  className: string
  onPageChange: (page: number) => void;
}
