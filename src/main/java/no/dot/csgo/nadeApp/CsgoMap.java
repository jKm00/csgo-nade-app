package no.dot.csgo.nadeApp;

import javax.management.InstanceAlreadyExistsException;
import java.util.ArrayList;
import java.util.Iterator;

/**
 * Represents a map ingame of csgo.
 * In this application a map contains strats that a team can execute. Each strat has a set of nades
 * witch are to be thrown be a spesific player.
 */
public class CsgoMap
{
    private final String mapImg;
    private final String mapName;
    private ArrayList<Strat> strats;

    /**
     * Creates an instance of a csgo map
     *
     * @param mapName img of the map
     * @param mapImg name of the map
     */
    public CsgoMap(String mapName, String mapImg)
    {
        if (mapImg == null)
        {
            mapImg = "";
        }
        if (mapName == null)
        {
            mapName = "";
        }
        if (mapImg.isBlank() || mapName.isBlank())
        {
            throw new IllegalArgumentException("Null or empty parameter");
        }

        this.mapImg = mapImg;
        this.mapName = mapName;
        this.strats = new ArrayList<>();
    }

    /**
     * Returns the name of the map
     *
     * @return the name of the map
     */
    public String getMapName()
    {
        return this.mapName;
    }

    /**
     * Adds a strat to the map
     *
     * @param strat to add
     * @throws InstanceAlreadyExistsException
     */
    public void addStrat(Strat strat) throws InstanceAlreadyExistsException
    {
        if (!this.checkForStrat(strat))
        {
            this.strats.add(strat);
        }
        else
        {
            throw new InstanceAlreadyExistsException("Strat is allready added to this map");
        }
    }

    /**
     * Check if a strat is registered to the map
     *
     * @param strat to check
     * @return {@code true} if strat exists, {@code false} otherwise
     */
    private boolean checkForStrat(Strat strat)
    {
        boolean stratFound = false;

        Iterator<Strat> it = this.strats.iterator();
        while(it.hasNext() && !stratFound)
        {
            if (it.next().getStratName().equals(strat.getStratName()))
            {
                stratFound = true;
            }
        }

        return stratFound;
    }

    /**
     * Returns an iterator that iterates over the strats for this map
     *
     * @return an iterator over strats
     */
    public Iterator<Strat> getIteratorOverStrats()
    {
        return this.strats.iterator();
    }
}
