module nade.app {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.graphics;
    requires java.management;
    opens no.dot.csgo.nadeApp to javadx.fxml;
    exports no.dot.csgo.nadeApp;
}