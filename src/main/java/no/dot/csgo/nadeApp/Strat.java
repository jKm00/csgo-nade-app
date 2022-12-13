package no.dot.csgo.nadeApp;

import no.dot.csgo.nadeApp.nade.Flash;
import no.dot.csgo.nadeApp.nade.Molly;
import no.dot.csgo.nadeApp.nade.Nade;
import no.dot.csgo.nadeApp.nade.Smoke;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * Represents a strat preformed at a round ingame of csgo.
 * A strat consist of multiple nades throw from different players
 * in a coordinated attempt to get an advantage of the opponent
 */
public class Strat
{
    private final String name;
    private final ArrayList<NadeThrower> nades;

    public Strat(String name)
    {
        this.name = name;
        this.nades = new ArrayList<>();
    }

    /**
     * Returns the name of the strat
     *
     * @return the name of the strat
     */
    public String getStratName()
    {
        return this.name;
    }

    /**
     * Adds a nade to the strat with a specific player designated to throw the nade
     *
     * @param nade to be thrown
     * @param player to throw the nade
     */
    public void addNade(Nade nade, Player player)
    {
        this.nades.add(new NadeThrower(player, nade));
    }

    /**
     * Returns the player that is responsible for throwing the nade given as parameter. Returns null
     * if no player was found.
     *
     * @param nade the nade you want to find out the player responsible for throwing
     * @return the player responsible for throwing the nade given as parameter
     */
    public Player getPlayerForANade(Nade nade)
    {
        Player playerFound = null;

        Iterator<NadeThrower> it = this.nades.iterator();
        while (it.hasNext() && playerFound == null)
        {
            NadeThrower nadeThrower = it.next();
            if (nadeThrower.getNade() == nade)
            {
                playerFound = nadeThrower.getPlayer();
            }
        }

        return playerFound;
    }

    /**
     * Returns an arraylist with all the nades required for the strat
     *
     * @return a list with all the nades
     */
    public ArrayList<Nade> getAllNades()
    {
        ArrayList<Nade> allNades = new ArrayList<>();

        for (NadeThrower nadeThrower : this.nades)
        {
            allNades.add(nadeThrower.getNade());
        }

        return  allNades;
    }


    /**
     * Returns the number of smokes required for the strat as an integer
     *
     * @return number of smokes required for the strat
     */
    public int getNumberOfSmokes()
    {
        int numberOfSmokes = 0;

        for (NadeThrower nadeThrower : this.nades)
        {
            Nade nade = nadeThrower.getNade();
            if (nade instanceof Smoke)
            {
                numberOfSmokes += 1;
            }
        }

        return numberOfSmokes;
    }

    /**
     * Returns the number of mollys required for the strat as an integer
     *
     * @return number of mollys required for the strat
     */
    public int getNumberOfMollys()
    {
        int numberOfMollys = 0;

        for (NadeThrower nadeThrower : this.nades)
        {
            Nade nade = nadeThrower.getNade();
            if (nade instanceof Molly)
            {
                numberOfMollys += 1;
            }
        }

        return numberOfMollys;
    }

    /**
     * Returns the number of flashes required for the strat as an integer
     *
     * @return number of flashes required for the strat
     */
    public int getNumberOfFlashes()
    {
        int numberOfFlashes = 0;

        for (NadeThrower nadeThrower : this.nades)
        {
            Nade nade = nadeThrower.getNade();
            if (nade instanceof Flash)
            {
                numberOfFlashes += 1;
            }
        }

        return numberOfFlashes;
    }

    /**
     * Returns an {@code ArrayList} with all the nades the player in the parameter is responsible for
     *
     * @param player the player you want to find nades for
     * @return a list with all the nades the player in the parameter is responsible for
     */
    public ArrayList<Nade> getNadesForOnePlayer(Player player)
    {
       ArrayList<Nade> nadesFound = new ArrayList<>();

       for (NadeThrower nadeThrower : this.nades)
       {
           if (nadeThrower.getPlayer() == player)
           {
               nadesFound.add(nadeThrower.getNade());
           }
       }

       return  nadesFound;
    }
}
