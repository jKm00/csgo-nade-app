package no.dot.csgo.nadeApp;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Menu;
import javafx.scene.control.MenuBar;
import javafx.scene.control.MenuItem;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

public class Main extends Application
{
    @Override
    public void start(Stage primaryStage)
    {

        try
        {
            Parent root = FXMLLoader.load(getClass().getClassLoader().getResource("gui.fxml"));
            Scene scene = new Scene(root, 1000, 800);
            primaryStage.setTitle("DOT Nade app");
            primaryStage.setScene(scene);
            primaryStage.show();
        }
        catch (Exception e)
        {
            System.out.println("error: " + e.getMessage());
        }
    }

    @Override
    public void stop()
    {
        System.exit(0);
    }

    public static void main(String[] args) {
        launch(args);
    }

}
