export interface Patch {
  small: string;
  large: string;
}

export interface Links {
  patch: Patch;
  reddit: {
    campaign: string;
    launch: string;
    media: string;
    recovery: string | null;
  };
}

export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string;
  links: Links;
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
