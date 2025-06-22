export interface TimeTrackingCardProps {
  /**
   * Number of hours spent
   */
  hoursSpent?: number;

  /**
   * Target number of hours
   */
  hoursTarget?: number;

  /**
   * Percentage of growth (positive number)
   */
  growthPercentage?: number;

  /**
   * Additional className to apply to the container
   */
  className?: string;
}
