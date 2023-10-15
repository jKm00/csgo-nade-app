-- Count function
CREATE OR REPLACE FUNCTION public.count_number_of_strats()
 RETURNS integer
LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN (SELECT COUNT(*) FROM strats);
END;
$function$;