package Java;

/* Loads satellite image and converts image into pixels to classify areas as land or water in order to determine if the area is suitable for building.
 * @author Andrew Evboifo
 * @ September 2025
 */
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.File;
import javax.imageio.ImageIO;

public class LandDetection {
    public static void main(String[] args) throws IOException {
        // checks to see that exactly one image argument is given
        if(args.length != 1){
            System.out.println("Usage: java LandDetection <image-path>");
            return;
        }

        String imagePath = args[0];
        File file = new File(imagePath);

        if(!file.exists()){
            System.out.println("FIle not found: "+ imagePath);
            return;
        }

        // reads and stores image data in a memory buffer to allow for manipulation of individual pixels
        BufferedImage bufferedImage = ImageIO.read(file);
        int width = bufferedImage.getWidth();
        int height = bufferedImage.getHeight();

        int landCount = 0;
        int waterCount = 0;

        /**
         *moves through each pixel in the bufferedImage 2D grid and separates the 32 bit signed pixels into 8 bits of Red Green and Blue.
         *The channel is then shifted to least significant 8 bits and masked with & 0xff to avoid negative values or contamination from old bits.
         */
        for( int i = 0; i < height; i++){
            for(int j = 0; j < width; j++){
                int imagePixels = bufferedImage.getRGB(j,i);
                int red = (imagePixels >> 16) & 0xff;
                int green = (imagePixels >> 8) & 0xff;
                int blue = imagePixels & 0xff; // no shifting (already in last 8 bits)


                // Basic threshold for land detection more blue means water body, else land mass.
                if (blue > red && blue > green){
                    waterCount++;
                } else{
                    landCount++;
                }
            }
        }

        // calculate land and water percentage
        double Area = width * height;
        double landPercentage = (landCount/Area) * 100;
        double waterPercentage = (waterCount/Area) * 100;

        System.out.printf("Land Percentage: %.2f%%\n", landPercentage);
        System.out.printf("Water Percentage: %.2f%%\n", waterPercentage);

        // Determines if land is buildable or not
        if (landPercentage > 30){
            System.out.println("Area is suitable for buildable!");
        } else{
            System.out.println("Area may not be suitable for building.");
        }
    }
}

