package no.dot.csgo.nadeApp.nade;

/**
 * Represents a nade on a map in csgo. A nade will be displayed on the map to display where it would land.
 * You can click on a nade to see the lineup.
 */
public abstract class Nade
{
    private final String location;
    private final String nadeLineup;
    private final String gif;
    private final String color;

    /**
     * Creates an instance of a nade object.
     * Can only be called from inherited classes
     *
     * @param location where the nade lands/pops
     * @param nadeLineup path to the img display the nade lineup
     * @param gif path to the gif showing how to throw the nade
     * @param color each nade has a different color to separate them from each other (Smoke: blue, Molly: red, Flash: yellow)
     */
    public Nade(String location, String nadeLineup, String gif, String color)
    {
        this.location = location;
        this.nadeLineup = nadeLineup;
        this.gif = gif;
        this.color = color;
    }

    /**
     * Returns the location of where the nade lands/pops
     *
     * @return location of where the nade lands/pops
     */
    public String getLocation()
    {
        return this.location;
    }

    /**
     * Returns the path to the img displaying the lineup
     *
     * @return path to img
     */
    public String getNadeLineup()
    {
        return this.nadeLineup;
    }

    /**
     * Returns the path to the gif explaining how to throw the nade
     *
     * @return path to a gif
     */
    public String getGif()
    {
        return this.gif;
    }

    /**
     * Returns the color of the nade
     *
     * @return color of the nade
     */
    public String getColor()
    {
        return this.color;
    }
}
