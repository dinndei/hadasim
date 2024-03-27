import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        boolean running=true;
        int act,height=0,width=0;
        double stand=0;
        while(running){
        System.out.println("למלבן-הקש 1\nלמשולש-הקש 2\nליציאה-הקש 3");
        act=in.nextInt();
        if(act==1||act==2){
            System.out.println("הכנס גובה  גדול מ1");
            height= in.nextInt();
            System.out.println("הכנס רוחב");
            width= in.nextInt();}
        switch(act){

            case 1:
                if(width==height||Math.abs(width-height)>5)
                    System.out.println("שטח:"+width*height);
                else
                    System.out.println("היקף:"+(2*width+2*height));
                break;
            case 2:
                System.out.println("להיקף הקש 1 , להדפסה הקש 2");
                act= in.nextInt();
                if(act==1) {
                    stand = Math.sqrt(Math.pow((width / 2), 2) + Math.pow(height, 2));
                    System.out.println("היקף:" + (2 * stand + width));
                }
                else if(act==2){
                    if (width%2==0||width>2*height)
                        System.out.println("אין אפשרות להדפיס משולש זה");
                    else printStarTriangle(width,height);
                }
                break;
            default:
                running=false;
                break;
        }
        }
        System.out.println("התוכנית הסתיימה כבקשתך.");
    }
    public static void printStarTriangle(int width,int height){
        int grow = 0,star=1,repeat=1;
        int jumps = (width - 1) / 2;
        int heightOfJump = (height - 2) / jumps;
        int firstJump = heightOfJump + (height - 2) % jumps;//הוספת השארית לקפיצה הראשונה

        for (int k = 0; k <jumps+2 ; k++) {
            if (k==1)
                repeat=firstJump;
            else if (k==jumps+1)//the last jump i.e. the width
                repeat=1;
            else if (k==2)
                repeat=heightOfJump;
            for (int l = 0; l <repeat ; l++) {
                for (int i = 0; i < (width / 2) - grow; i++) {
                    System.out.print(" ");
                }
                for (int i = 0; i < star; i++) {
                    System.out.print("*");
                }
                System.out.println();
            }
            grow++;
            star+=2;
        }

    }
}