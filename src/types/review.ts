export interface ReviewRatingStatistics {
  averageRating: number;
  count: number;
  highestRating: number;
  lowestRating: number;
  ratingsDistribution: unknown;
}

export interface ReviewReference {
  id: string;
  typeId: string;
}
